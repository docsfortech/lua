---
title: Chunks
code: |
    a = 1
    b = a*2
    
    a = 1;
    b = a*2;
    
    a = 1 ; b = a*2
    
    a = 1   b = a*2    -- ugly, but valid

    print(a)
    print(b)
---

## Chunks

Each piece of code that Lua executes, such as a file or a single line in interactive mode, is a chunk. More specifically, a chunk is simply a sequence of statements.

A semicolon may optionally follow any statement. Usually, I use semicolons only to separate two or more statements written in the same line, but this is just a convention. Line breaks play no role in Lua's syntax; for instance, the following four chunks are all valid and equivalent:

```lua
a = 1
b = a*2

a = 1;
b = a*2;

a = 1 ; b = a*2

a = 1   b = a*2    -- ugly, but valid
```

A chunk may be as simple as a single statement, such as in the "hello world" example, or it may be composed of a mix of statements and function definitions (which are assignments actually, as we will see later), such as the factorial example. A chunk may be as large as you wish. Because Lua is used also as a data-description language, chunks with several megabytes are not uncommon. The Lua interpreter has no problems at all with large sizes.
