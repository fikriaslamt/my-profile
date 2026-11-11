import { chromium } from '@playwright/test';
const b = await chromium.launch();
const p = await b.newPage({viewport:{width:1280,height:400}});
await p.goto('http://localhost:4321/');
await p.waitForTimeout(1500);
await p.screenshot({path: process.env.COMMANDCODE_SCRATCHPAD + '/navbar-fixed.png'});
await b.close();
