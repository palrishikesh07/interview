# Go (Golang) Beginner Guide — From Your VS Code Folders

This guide follows the topics visible in your VS Code Explorer. It starts with the basics and explains each topic in simple language with small, runnable examples.

## How to run Go code

Install Go from [go.dev/dl](https://go.dev/dl/), then check the installation:

```bash
go version
```

Create a project folder and initialize a module:

```bash
mkdir go-learning
cd go-learning
go mod init example.com/go-learning
```

Create `main.go`:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}
```

Run it:

```bash
go run .
```

Build an executable:

```bash
go build .
```

**Remember:** `package main` makes an executable program, and `func main()` is where execution starts.

---

## 1. Variables, constants, and basic types

Variables store values. Go is statically typed, so each value has a type.

```go
package main

import "fmt"

func main() {
    var name string = "Ravi"
    age := 25                 // Go infers the type (int)
    const country = "India"

    var active bool = true
    var score float64 = 91.5

    fmt.Println(name, age, country, active, score)
}
```

Common types: `string`, `bool`, `int`, `int64`, `float64`, and `byte`.

- `var x int = 10` declares a variable.
- `x := 10` is short declaration syntax, usable inside functions.
- A constant uses `const` and cannot be reassigned.

## 2. Functions (`function_folder`)

A function is reusable code. Go can return more than one value.

```go
package main

import "fmt"

func add(a int, b int) int {
    return a + b
}

func divide(a, b float64) (float64, bool) {
    if b == 0 {
        return 0, false
    }
    return a / b, true
}

func main() {
    fmt.Println(add(2, 3))

    result, ok := divide(10, 2)
    if ok {
        fmt.Println(result)
    }
}
```

`(float64, bool)` means the function returns two values. This pattern is often used to return a result plus success/failure information.

## 3. Arrays (`array_folder`)

An array has a fixed length, and its length is part of its type.

```go
package main

import "fmt"

func main() {
    numbers := [3]int{10, 20, 30}
    numbers[1] = 25

    fmt.Println(numbers)      // [10 25 30]
    fmt.Println(len(numbers)) // 3
}
```

Array indexes start at `0`. Accessing an index outside the array bounds causes a runtime panic.

## 4. Slices (`slice_folder`)

A slice is a flexible view over an underlying array. It is used more often than arrays.

```go
package main

import "fmt"

func main() {
    fruits := []string{"apple", "banana"}
    fruits = append(fruits, "mango")

    fmt.Println(fruits)
    fmt.Println(fruits[0])
    fmt.Println(len(fruits)) // number of elements
    fmt.Println(cap(fruits)) // capacity of the underlying array
}
```

A slice can grow using `append`. Always assign the result back: `items = append(items, value)`.

## 5. Loops (`loop_folder`)

Go uses `for` for all loop forms; there is no separate `while` keyword.

```go
package main

import "fmt"

func main() {
    for i := 1; i <= 3; i++ {
        fmt.Println(i)
    }

    count := 3
    for count > 0 { // while-style loop
        fmt.Println("count:", count)
        count--
    }

    names := []string{"Asha", "Ben"}
    for index, name := range names {
        fmt.Println(index, name)
    }
}
```

Use `break` to exit a loop and `continue` to skip to the next iteration.

## 6. Conditions and `switch` (`switch_folder`)

Use `if` for decisions and `switch` when comparing one value against several cases.

```go
package main

import "fmt"

func main() {
    age := 20

    if age >= 18 {
        fmt.Println("Adult")
    } else {
        fmt.Println("Minor")
    }

    day := "Saturday"
    switch day {
    case "Saturday", "Sunday":
        fmt.Println("Weekend")
    default:
        fmt.Println("Weekday")
    }
}
```

Go does not require parentheses around `if` or `switch` conditions.

## 7. Maps (`map_folder`)

A map stores key-value pairs, like a dictionary. Map iteration order is not guaranteed.

```go
package main

import "fmt"

func main() {
    scores := map[string]int{
        "Asha": 90,
        "Ben":  82,
    }

    scores["Chen"] = 95
    value, exists := scores["Asha"]
    fmt.Println(value, exists)

    delete(scores, "Ben")

    for name, score := range scores {
        fmt.Println(name, score)
    }
}
```

The `value, exists := map[key]` form helps distinguish a missing key from a key whose value is the zero value.

## 8. Pointers (`pointer_folder`)

A pointer stores the memory address of a value. `&x` gets an address; `*p` reads or changes the value at that address.

```go
package main

import "fmt"

func change(value *int) {
    *value = 100
}

func main() {
    number := 10
    pointer := &number

    fmt.Println(*pointer) // 10
    change(&number)
    fmt.Println(number)   // 100
}
```

Go does not support pointer arithmetic. A pointer's zero value is `nil`.

## 9. Structs (`struct_folder`)

A struct groups related fields into one type, similar to a simple record or object.

```go
package main

import "fmt"

type User struct {
    Name string
    Age  int
}

func main() {
    user := User{Name: "Asha", Age: 28}
    fmt.Println(user.Name)
    user.Age = 29
    fmt.Printf("%+v\n", user)
}
```

Use structs to represent things such as users, products, orders, or API responses.

## 10. Methods and interfaces (`Interace_folder`)

A method is a function associated with a type. An interface describes behavior through a set of method signatures.

```go
package main

import "fmt"

type Speaker interface {
    Speak() string
}

type Person struct {
    Name string
}

func (p Person) Speak() string {
    return "Hello, I am " + p.Name
}

func introduce(s Speaker) {
    fmt.Println(s.Speak())
}

func main() {
    p := Person{Name: "Mina"}
    introduce(p) // Person satisfies Speaker implicitly
}
```

Go does not use an `implements` keyword. A type satisfies an interface when it has the required methods.

## 11. Packages (`package_folder`)

Packages organize related Go files. Files in the same directory normally belong to the same package.

Example structure:

```text
go-learning/
├── go.mod
├── main.go
└── greeting/
    └── greeting.go
```

`greeting/greeting.go`:

```go
package greeting

func Hello(name string) string {
    return "Hello, " + name
}
```

`main.go`:

```go
package main

import (
    "fmt"
    "example.com/go-learning/greeting"
)

func main() {
    fmt.Println(greeting.Hello("Asha"))
}
```

Replace `example.com/go-learning` with the module path in your `go.mod`. An identifier beginning with an uppercase letter, such as `Hello`, is exported and can be used from another package.

## 12. Enums (`enum_folder`)

Go does not have a dedicated `enum` keyword. A common pattern uses a custom type and `iota`.

```go
package main

import "fmt"

type Status int

const (
    Pending Status = iota
    Approved
    Rejected
)

func main() {
    current := Approved
    fmt.Println(current) // 1
}
```

These constants have numeric values. For readable output, add a `String()` method or use string constants when appropriate.

## 13. Closures (`closure_folder`)

A closure is a function that remembers variables from the surrounding scope, even after the outer function has returned.

```go
package main

import "fmt"

func counter() func() int {
    count := 0

    return func() int {
        count++
        return count
    }
}

func main() {
    next := counter()
    fmt.Println(next()) // 1
    fmt.Println(next()) // 2
}
```

Each call to `counter()` creates a separate counter.

## 14. Variadic functions (`Variadic_func_folder`)

A variadic function accepts zero or more values of the same type using `...`.

```go
package main

import "fmt"

func sum(numbers ...int) int {
    total := 0
    for _, n := range numbers {
        total += n
    }
    return total
}

func main() {
    fmt.Println(sum(1, 2, 3)) // 6

    values := []int{4, 5, 6}
    fmt.Println(sum(values...)) // pass slice elements
}
```

Inside the function, `numbers` behaves like a slice.

## 15. Generics (`generics_folder`)

Generics let you write a function or type that works with multiple types while retaining compile-time type checking.

```go
package main

import "fmt"

func First[T any](items []T) T {
    return items[0]
}

func main() {
    fmt.Println(First([]int{10, 20}))
    fmt.Println(First([]string{"Go", "Rust"}))
}
```

`T` is a type parameter and `any` means any type. This example assumes the slice is not empty; check `len(items)` in production code before indexing.

## 16. Goroutines (`gorountine`)

A goroutine is a lightweight unit of concurrent execution managed by the Go runtime.

```go
package main

import (
    "fmt"
    "time"
)

func say(message string) {
    fmt.Println(message)
}

func main() {
    go say("Hello from a goroutine")
    time.Sleep(100 * time.Millisecond) // simple demo only
}
```

This sleep is only to keep the example simple. In real programs, use channels, a `sync.WaitGroup`, or another synchronization method to wait for work to finish reliably.

## 17. Channels (`channel_folder`)

Channels let goroutines communicate and coordinate by sending and receiving values.

```go
package main

import "fmt"

func main() {
    messages := make(chan string)

    go func() {
        messages <- "Task finished"
    }()

    message := <-messages
    fmt.Println(message)
}
```

`ch <- value` sends; `value := <-ch` receives. An unbuffered channel send waits until another goroutine receives. A receive from a channel that is never sent to can block forever.

## 18. Mutexes (`mutex_folder`)

A mutex protects shared data so multiple goroutines do not modify it at the same time.

```go
package main

import (
    "fmt"
    "sync"
)

func main() {
    var mu sync.Mutex
    counter := 0
    var wg sync.WaitGroup

    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            mu.Lock()
            counter++
            mu.Unlock()
        }()
    }

    wg.Wait()
    fmt.Println(counter) // 100
}
```

Always unlock a mutex after locking it. `defer mu.Unlock()` is a common way to ensure unlocking happens when a function returns. Keep the protected section small.

## 19. `defer`, `panic`, and `recover` (`starterlf`)

`defer` schedules a function call to run when the surrounding function returns. It is often used to close files or unlock mutexes.

```go
package main

import "fmt"

func main() {
    defer fmt.Println("Runs last")
    fmt.Println("Runs first")
}
```

`panic` stops normal execution in the current goroutine while unwinding deferred calls. `recover` can catch a panic only when called from a deferred function.

```go
package main

import "fmt"

func safeWork() {
    defer func() {
        if err := recover(); err != nil {
            fmt.Println("Recovered:", err)
        }
    }()

    panic("something went wrong")
}

func main() {
    safeWork()
    fmt.Println("Program continues")
}
```

Do not use panic for ordinary errors such as invalid input or a missing file. Prefer returning an `error`.

## 20. Error handling (`starterlf` and general Go)

Go commonly returns errors as values. Check them instead of ignoring them.

```go
package main

import (
    "errors"
    "fmt"
)

func findUser(id int) (string, error) {
    if id <= 0 {
        return "", errors.New("id must be positive")
    }
    return "Asha", nil
}

func main() {
    name, err := findUser(0)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println(name)
}
```

`nil` means no error. A typical pattern is `if err != nil { ... }`.

## 21. File handling (`file_folder`)

Use the `os` package to read and write files. This example writes a file and then reads it back.

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    err := os.WriteFile("note.txt", []byte("Learning Go!"), 0644)
    if err != nil {
        fmt.Println("write error:", err)
        return
    }

    data, err := os.ReadFile("note.txt")
    if err != nil {
        fmt.Println("read error:", err)
        return
    }

    fmt.Println(string(data))
}
```

The permission value `0644` gives the owner read/write access and others read access on systems that use Unix-style permissions. Check errors for every file operation.

## 22. Type assertions and type switches

These are useful when working with interface values.

```go
package main

import "fmt"

func describe(value any) {
    switch v := value.(type) {
    case string:
        fmt.Println("text:", v)
    case int:
        fmt.Println("integer:", v)
    default:
        fmt.Printf("other type: %T\n", v)
    }
}

func main() {
    describe("hello")
    describe(42)
    describe(true)
}
```

A type switch checks the actual dynamic type stored in an interface value.

## 23. `range`

`range` iterates over elements in arrays, slices, strings, maps, and channels.

```go
package main

import "fmt"

func main() {
    letters := []string{"a", "b", "c"}
    for index, letter := range letters {
        fmt.Println(index, letter)
    }

    for _, letter := range letters { // use _ to ignore the index
        fmt.Println(letter)
    }
}
```

For strings, `range` iterates over Unicode code points (runes), not bytes.

## 24. String and rune basics

A Go string is a read-only sequence of bytes, usually containing UTF-8 text. A `rune` represents a Unicode code point.

```go
package main

import "fmt"

func main() {
    text := "Go!"
    fmt.Println(len(text)) // 3 bytes

    greeting := "नमस्ते"
    fmt.Println(len(greeting)) // number of UTF-8 bytes, not characters

    runes := []rune(greeting)
    fmt.Println(len(runes)) // number of Unicode code points
}
```

Use `[]rune(s)` when you need to process Unicode code points. Grapheme clusters (what people perceive as characters) can contain multiple runes.

## 25. Concurrency vs parallelism

- **Concurrency:** structuring a program so multiple tasks can make progress over overlapping periods.
- **Parallelism:** tasks literally executing at the same time, often on different CPU cores.
- Goroutines make concurrency convenient; channels and synchronization help coordinate tasks.
- Shared mutable data needs safe coordination, for example with a mutex or by sending messages over channels.

## 26. Testing (`*_test.go`)

Go has a built-in testing tool. Test files end in `_test.go`, and test functions start with `Test`.

`math.go`:

```go
package mathutil

func Add(a, b int) int {
    return a + b
}
```

`math_test.go` in the same folder:

```go
package mathutil

import "testing"

func TestAdd(t *testing.T) {
    got := Add(2, 3)
    want := 5
    if got != want {
        t.Fatalf("Add(2, 3) = %d; want %d", got, want)
    }
}
```

Run tests with:

```bash
go test ./...
```

## 27. Formatting and useful Go commands

```bash
gofmt -w .       # format Go files in the current directory tree
go run .         # run the current package
go build ./...   # compile packages
go test ./...    # run tests
go vet ./...     # find suspicious code patterns
go mod tidy      # add/remove module requirements as needed
```

Go code is conventionally formatted with `gofmt`. Many editors run it automatically when saving.

## 28. Imports and the blank identifier (`_`)

Go reports unused imports and local variables as compile errors. Use `_` when you intentionally ignore a returned value.

```go
package main

import "fmt"

func main() {
    _, err := fmt.Println("Hello")
    if err != nil {
        fmt.Println(err)
    }
}
```

The blank identifier can discard a value, but do not use it to hide errors you should handle.

## 29. Suggested learning order

Follow this order, practicing each topic in its own small folder/file:

1. Hello World, variables, constants, and basic types
2. `if`, `switch`, `for`, and `range`
3. Functions and multiple return values
4. Arrays, slices, and maps
5. Structs, methods, and interfaces
6. Pointers
7. Packages and modules
8. Errors, `defer`, and file handling
9. Closures and variadic functions
10. Generics
11. Goroutines and channels
12. Mutexes and `WaitGroup`
13. Testing and Go tooling

## 30. Beginner practice exercises

Try these without looking at a solution first:

1. Print your name and age.
2. Write `add(a, b int) int`.
3. Print numbers from 1 to 100; print `Fizz` for multiples of 3 and `Buzz` for multiples of 5.
4. Find the largest number in a slice.
5. Count how many times each word appears using a map.
6. Create a `User` struct with a method that prints a greeting.
7. Read a text file and print its contents.
8. Write a function that returns a useful error for invalid input.
9. Launch three goroutines and collect their results using a channel.
10. Write unit tests for your `add` function.

## Quick glossary

| Term | Simple meaning |
|---|---|
| Variable | A named place to store a value |
| Function | Reusable block of code |
| Array | Fixed-size sequence of values |
| Slice | Flexible sequence of values |
| Map | Key-value collection |
| Pointer | Holds the address of a value |
| Struct | Groups fields together |
| Interface | Describes required behavior |
| Package | Organizes related code |
| Error | A value describing something that went wrong |
| Goroutine | Lightweight concurrent task |
| Channel | Lets goroutines send values to one another |
| Mutex | Protects shared data from simultaneous access |
| Generic | Code that works with multiple types safely |

## Important beginner advice

- Keep examples small and run them yourself.
- Read compiler errors carefully; Go errors often point directly to the problem.
- Handle errors instead of ignoring them.
- Prefer simple code over clever code.
- Learn slices, maps, structs, and interfaces well before diving deeply into concurrency.
