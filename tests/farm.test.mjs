import test from "node:test";
import assert from "node:assert/strict";
import { cameraForProgress } from "../farm.js";

test("the arrival and destination have exact, bounded camera positions", () => {
  const destination = { x: -8, y: 4, scale: 1.3 };
  assert.deepEqual(cameraForProgress(-1, destination), { x: -0, y: 0, scale: 1 });
  assert.deepEqual(cameraForProgress(0, destination), { x: -0, y: 0, scale: 1 });
  assert.deepEqual(cameraForProgress(1, destination), { x: -8, y: 4, scale: 1.3 });
  assert.deepEqual(cameraForProgress(2, destination), { x: -8, y: 4, scale: 1.3 });
});

test("all camera axes move together without overshooting or reversing", () => {
  const destination = { x: 12, y: -6, scale: 1.4 };
  let previous = { x: 0, y: 0, scale: 1 };
  for (let i = 0; i <= 100; i++) {
    const camera = cameraForProgress(i / 100, destination);
    assert.ok(camera.x >= previous.x && camera.x <= destination.x);
    assert.ok(camera.y <= previous.y && camera.y >= destination.y);
    assert.ok(camera.scale >= previous.scale && camera.scale <= destination.scale);
    previous = camera;
  }
  assert.deepEqual(cameraForProgress(0.5, destination), { x: 6, y: -3, scale: 1.2 });
});

test("missing or invalid configuration never produces invalid CSS transforms", () => {
  assert.deepEqual(cameraForProgress(NaN, { x: "invalid", y: Infinity, scale: "" }), { x: 0, y: 0, scale: 1 });
  assert.deepEqual(cameraForProgress(1, { x: 100, y: -100, scale: 100 }), { x: 30, y: -30, scale: 1.8 });
  assert.deepEqual(cameraForProgress(1, { scale: -5 }), { x: 0, y: 0, scale: 1 });
});
