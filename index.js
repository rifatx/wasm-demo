"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const outputDiv = document.getElementById("outputDiv");
        const wasmPath = "bin.wasm";
        let wasmClient;
        const wasm = yield WebAssembly.instantiateStreaming(fetch(wasmPath), {
            "env": {
                "platform_write": (buffer, length) => {
                    const t = new TextDecoder().decode(new Uint8ClampedArray(wasmClient.memory.buffer, buffer, length));
                    outputDiv.innerHTML += t;
                },
                "platform_read": (buffer, length) => {
                    const text = "world"; // data from web page
                    const lenBuf = new Uint8ClampedArray(wasmClient.memory.buffer, length, 1);
                    lenBuf[0] = text.length;
                    const arr = new TextEncoder().encode(text);
                    const memBuf = new Uint8ClampedArray(wasmClient.memory.buffer, buffer, text.length);
                    for (let i = 0; i < text.length; ++i) {
                        memBuf[i] = arr[i];
                    }
                }
            }
        });
        wasmClient = {
            memory: wasm.instance.exports.memory,
            run: wasm.instance.exports.run
        };
        wasmClient.run();
    });
})();
