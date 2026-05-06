# Migration Matrix

ตารางนี้ใช้กำหนดแผนย้ายโครงสร้าง runtime จาก asset ปัจจุบันไปยัง target component พร้อม action ที่ต้องทำ และสถานะ execution ของทีม

| Current Asset | Target Component | Action (move/split/rewrite) | Dependency Order | Risk Level | Rollback Plan | Status |
|---|---|---|---|---|---|---|
| `core/intent.js` | `core/intent/extractor.js` | split | 2 (หลัง Governor baseline) | medium | revert เป็นไฟล์เดิมแล้วชี้ import กลับมาที่ `core/intent.js` | not-started |
| `core/agns/brain.js` | `core/brain/state-machine.js` | move + rewrite | 3 (หลัง Intent extractor) | high | keep compatibility adapter ที่ export `processIntent` signature เดิม | not-started |
| `core/aeth/compiler.js` | `core/aeth/compiler/index.js` | move | 4 (หลัง Brain state) | low | restore path เดิมและ re-export จาก index ใหม่ | not-started |
| `core/ir/builder.js` | `core/ir/presence-builder.js` | rewrite | 5 (หลัง AETH compiler) | medium | feature-flag `IR_BUILDER_V1` fallback ไป logic เดิม | not-started |
| `core/runtime/governor.js` | `core/runtime/governor/engine.js` | split | 1 (ทำก่อน Uniform mapper) | high | freeze rule-set เวอร์ชันเดิมและ toggle `GOVERNOR_V1` | in-progress |
| `engine/uniforms.js` | `engine/uniforms/mapper.js` | rewrite | 6 (หลัง Governor ใหม่) | high | keep dual mapper (`mapper.v1`, `mapper.v2`) และ switch ด้วย env flag | not-started |
| `core/runtime/pipeline.js` | `core/runtime/pipeline/orchestrator.js` | split | 7 (หลัง Governor + Uniform mapper) | medium | maintain wrapper class `AetherPipeline` ที่เรียก orchestrator เก่าได้ | not-started |
| `engine/renderer.js` | `engine/renderer/webgl-renderer.js` | move | 8 (หลัง pipeline) | medium | fallback renderer path via config `renderer=legacy` | not-started |
| `ui/controller.js` | `ui/runtime/controller.js` | move + rewrite | 9 (หลัง renderer stabilization) | medium | keep compatibility facade ที่รับ method เดิม | not-started |
| `main.js` | `app/bootstrap.js` | split | 10 (ขั้นสุดท้าย) | low | restore entrypoint เดิมและ retain bootstrap proxy | not-started |

## Dependency Notes

- ลำดับบังคับสำคัญ: **Governor ต้องเสร็จก่อน Uniform mapper** เพื่อให้ mapping ค่าที่ถูก clamp แล้วสอดคล้องกับ policy ใหม่
- แนะนำทำทีละ phase และ merge เมื่อผ่าน unit tests ใน scope ของ phase นั้น
