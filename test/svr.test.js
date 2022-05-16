import { app } from '../server/svr.js';
import fetch from 'node-fetch';

let bricksTest = await fetch('http://localhost:8080/bricks');
await test('Testing bricks endpoint', async () => {
    await expect(bricksTest.status).toEqual(200);
});

await test('Testing that the bricks exist', async () => {
    await expect(bricksTest).toBeDefined();
})

// //////////////////////////////////////////////////////////////////
let authConfigTest = await fetch('http://localhost:8080/auth-config');
await test('Testing Auth Config endpoint', async () => {
    await expect(authConfigTest.status).toEqual(200);
});

await test('Testing that the auth configuration exists', async () => {
    await expect(authConfigTest).toBeDefined();
});

// //////////////////////////////////////////////////////////////////
let brickTest = await fetch('http://localhost:8080/brick');
await test('Testing Auth Config endpoint', async () => {
    await expect(brickTest.status).toEqual(200);
});

await test('Testing that the brick exists', async () => {
    await expect(brickTest).toBeDefined();
});

// // //////////////////////////////////////////////////////////////////
let kitTest = await fetch('http://localhost:8080/kit');
await test('Testing Auth Config endpoint', async () => {
    await expect(kitTest.status).toEqual(200);
});

await test('Testing that the auth configuration exists', async () => {
    await expect(kitTest).toBeDefined();
});

// // //////////////////////////////////////////////////////////////////
let kitsTest = await fetch('http://localhost:8080/kits');
await test('Testing Auth Config endpoint', async () => {
    await expect(kitsTest.status).toEqual(200);
});

await test('Testing that the kits exists', async () => {
    await expect(kitsTest).toBeDefined();
});

// // //////////////////////////////////////////////////////////////////
let videos = await fetch('http://localhost:8080/videos');
await test('Testing videos endpoint', async () => {
    await expect(videos.status).toEqual(200);
});

await test('Testing that the videos exists', async () => {
    await expect(videos).toBeDefined();
});

// // //////////////////////////////////////////////////////////////////
let updatedb = await fetch('http://localhost:8080/brick/:basket');
await test('Testing updatedb endpoint', async () => {
    await expect(updatedb.status).toEqual(200);
});

await test('Testing that the updatedb exists', async () => {
    await expect(updatedb).toBeDefined();
});

// // //////////////////////////////////////////////////////////////////
let sort = await fetch('http://localhost:8080/bricks/:sort');
await test('Testing sort endpoint', async () => {
    await expect(sort.status).toEqual(200);
});

await test('Testing that the sort exists', async () => {
    await expect(sort).toBeDefined();
});

export default app;