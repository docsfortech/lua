---
title: Hello world!
slug: /
code: |
    print("Hello, World!")


---
## Welcome to the Lua language tour! 💫

This Tour is inspired by the [gleam](https://tour.gleam.run/) language tour, it uses a custom [fengari](https://github.com/fengari-lua) build to run lua code locally.

Content is taken from the Programming in Lua book.

To keep with the tradition, our first program in Lua just prints "Hello World"

```lua
print("Hello World!")
```

As a slightly more complex example, the following program defines a function to compute the factorial of a given number, asks the user for a number, and prints its factorial:

```lua
-- defines a factorial function
function fact (n)
  if n == 0 then
    return 1
  else
    return n * fact(n-1)
  end
end

print(fact(10))
```