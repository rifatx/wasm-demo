(async function () {
  interface WasmClient {
    memory:WebAssembly.Memory;
    run: (() => void);
  }

  const outputDiv: HTMLElement = document.getElementById("outputDiv")!;
  const wasmPath = "bin.wasm";
  let wasmClient:WasmClient;

  const wasm = await WebAssembly.instantiateStreaming(
    fetch(wasmPath), {
      "env": {
        "platform_write" : (buffer: number, length: number) => {
          const t = new TextDecoder().decode(new Uint8ClampedArray(wasmClient.memory.buffer, buffer, length));
          outputDiv.innerHTML += t;
        },
        "platform_read": (buffer: number, length: number) => {
          const text = "world"; // data from web page

          const lenBuf = new Uint8ClampedArray(wasmClient.memory.buffer, length, 1);
          lenBuf[0] = text.length;

          const arr = new TextEncoder().encode(text);
          const memBuf = new Uint8ClampedArray(wasmClient.memory.buffer, buffer, text.length);
          for (let i: number = 0; i < text.length; ++i) {
            memBuf[i] = arr[i];
          }
        }
      }
    });

    wasmClient = {
      memory: wasm.instance.exports.memory as WebAssembly.Memory,
      run: wasm.instance.exports.run as () => void
    };

    wasmClient.run();
})();
