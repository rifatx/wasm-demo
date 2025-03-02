#!/bin/bash

clang -Wall -Wextra --target=wasm32 -Os -fno-builtin --no-standard-libraries -Wl,--no-entry -Wl,--export=run -Wl,--export=__heap_base -Wl,--allow-undefined -o bin.wasm bin.c
