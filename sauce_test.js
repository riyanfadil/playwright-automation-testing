const { chromium } = require('playwright');
require('dotenv').config();
const fs = require('fs');

(async () => {
    // Create screenshoot directory if it doesn't exist
    const screenshotDir = 'screenshoot';
    if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir);
    }

    console.log('Starting Playwright automation...');
    
    // Launch browser (headless: false so you can watch the automation in action)
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        // Navigate to Saucedemo
        await page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });

        // Wait for the credentials section to be visible
        await page.waitForSelector('#login_credentials');
        const credentialsText = await page.innerText('#login_credentials');
        const passwordsText = await page.innerText('.login_password');

        // Parse standard username and password
        // The text can contain extra whitespace or newlines
        let cleanCreds = credentialsText.replace(/Accepted usernames are:/i, '').trim();
        let cleanPass = passwordsText.replace(/Password for all users:/i, '').trim();

        const usernames = cleanCreds.split(/\r?\n/).map(s => s.trim()).filter(s => s.length > 0);
        const passwords = cleanPass.split(/\r?\n/).map(s => s.trim()).filter(s => s.length > 0);

        const username = usernames[0]; 
        const password = passwords[0]; 

        console.log('\n--- Login Info ---');
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);
        console.log('------------------\n');

        // Log in
        await page.fill('[data-test="username"]', username);
        await page.fill('[data-test="password"]', password);
        await page.click('[data-test="login-button"]');

        // Wait for navigation to inventory page
        await page.waitForURL('**/inventory.html');
        console.log('Login successful. Now picking items...\n');

        // Add the first 2 items to the cart
        const addToCartButtons = page.locator('.btn_inventory');
        await addToCartButtons.nth(0).click();
        await addToCartButtons.nth(1).click();
        console.log('Added 2 items to the shopping cart.\n');

        // Navigate to shopping cart
        await page.click('.shopping_cart_link');
        await page.waitForURL('**/cart.html');

        // Proceed to Checkout
        await page.click('[data-test="checkout"]');
        await page.waitForURL('**/checkout-step-one.html');

        // Read variables from .env file
        const firstName = process.env.FIRST_NAME || 'DefaultFirst';
        const lastName = process.env.LAST_NAME || 'DefaultLast';
        const zipCode = process.env.ZIP_CODE || '00000';

        // Fill out checkout form
        await page.fill('[data-test="firstName"]', firstName);
        await page.fill('[data-test="lastName"]', lastName);
        await page.fill('[data-test="postalCode"]', zipCode);
        
        // 1st Screenshot: Price summary
        await page.screenshot({ path: `${screenshotDir}/page_checkout.png`, fullPage: true });
        console.log(`Saved check page check out ${screenshotDir}/1_harga_checkout.png`);

        await page.click('[data-test="continue"]');
        await page.waitForURL('**/checkout-step-two.html');

        // Get Price and Tax information
        const subtotal = await page.textContent('.summary_subtotal_label');
        const tax = await page.textContent('.summary_tax_label');
        const total = await page.textContent('.summary_total_label');

        console.log('--- Checkout Prices ---');
        console.log(subtotal);
        console.log(tax);
        console.log(total);
        console.log('-----------------------\n');

        // 1st Screenshot: Price summary
        await page.screenshot({ path: `${screenshotDir}/1_harga_checkout.png`, fullPage: true });
        console.log(`Saved price summary screenshot to ${screenshotDir}/1_harga_checkout.png`);

        // Finish the checkout
        await page.click('[data-test="finish"]');
        await page.waitForURL('**/checkout-complete.html');

        // Validate the "Thanks" element
        const thanksHeader = await page.textContent('.complete-header');
        console.log('\n--- Final Validation ---');
        console.log(`Message on screen: "${thanksHeader}"`);
        
        if (thanksHeader.toLowerCase().includes('thank you')) {
            console.log('✅ Validation SUCCESS: "Thank You" message found!');
        } else {
            console.log('❌ Validation FAILED: "Thank You" message not found!');
        }

        // 2nd Screenshot: Completed page (Thanks element)
        await page.screenshot({ path: `${screenshotDir}/2_checkout_selesai.png`, fullPage: true });
        console.log(`Saved completion screenshot to ${screenshotDir}/2_checkout_selesai.png`);
        console.log('------------------------\n');

        // Generate HTML Report
        const validationStatus = thanksHeader.toLowerCase().includes('thank you') ? 'SUCCESS' : 'FAILED';
        const reportHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Automation Report - SauceDemo</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 40px; background-color: #f0f2f5; color: #333; }
        h1 { text-align: center; color: #1a73e8; }
        .container { max-width: 800px; margin: 0 auto; }
        .card { background: white; padding: 25px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 25px; }
        .card h2 { margin-top: 0; color: #444; border-bottom: 2px solid #f0f2f5; padding-bottom: 10px; }
        .row { display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px dashed #eee; padding-bottom: 5px; }
        .label { font-weight: bold; color: #555; }
        .success { color: #28a745; font-weight: bold; padding: 4px 8px; background: #e6f4ea; border-radius: 4px; }
        .failed { color: #dc3545; font-weight: bold; padding: 4px 8px; background: #fce8e6; border-radius: 4px; }
        img { max-width: 100%; height: auto; border: 1px solid #ddd; border-radius: 4px; margin-top: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Automation Test Report</h1>
        
        <div class="card">
            <h2>1. Login Information</h2>
            <div class="row"><span class="label">Username Used:</span> <span>${username}</span></div>
            <div class="row"><span class="label">Password Used:</span> <span>${password}</span></div>
        </div>

        <div class="card">
            <h2>2. Checkout Details</h2>
            <div class="row"><span class="label">First Name:</span> <span>${firstName}</span></div>
            <div class="row"><span class="label">Last Name:</span> <span>${lastName}</span></div>
            <div class="row"><span class="label">Postal Code:</span> <span>${zipCode}</span></div>
        </div>

        <div class="card">
            <h2>3. Price Summary</h2>
            <div class="row"><span class="label">Subtotal:</span> <span>${subtotal.replace('Item total: ', '')}</span></div>
            <div class="row"><span class="label">Tax:</span> <span>${tax.replace('Tax: ', '')}</span></div>
            <div class="row"><span class="label">Total:</span> <span><strong style="font-size:1.2em;color:#e53935;">${total.replace('Total: ', '')}</strong></span></div>
            
            <p class="label" style="margin-top:20px;">Screenshot (Halaman Harga):</p>
            <img src="screenshoot/1_harga_checkout.png" alt="Price Summary Screenshot" />
        </div>

        <div class="card">
            <h2>4. Final Validation</h2>
            <div class="row">
                <span class="label">Status:</span> 
                <span class="${validationStatus.toLowerCase()}">${validationStatus}</span>
            </div>
            <div class="row"><span class="label">Message Found:</span> <span>"${thanksHeader}"</span></div>
            
            <p class="label" style="margin-top:20px;">Screenshot (Halaman Sukses):</p>
            <img src="screenshoot/2_checkout_selesai.png" alt="Checkout Complete Screenshot" />
        </div>
    </div>
</body>
</html>
        `;
        
        fs.writeFileSync('report.html', reportHtml);
        console.log('✅ Laporan HTML berhasil dibuat! Silakan buka file "report.html" di browser.');

    } catch (error) {
        console.error('Automation encountered an error:', error);
    } finally {
        await browser.close();
        console.log('Browser closed. Automation finished.');
    }
})();
