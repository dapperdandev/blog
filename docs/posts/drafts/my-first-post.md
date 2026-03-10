---
title: Hello World from GitHub Actions
description: 'Testing every markdown feature dev.to supports — headings, code, tables, images, and more'
tags:
  - devto
  - markdown
  - testing
  - tutorial
---

## Headings

### Third Level

#### Fourth Level

##### Fifth Level

---

## Text Formatting

This is **bold**, this is _italic_, and this is **_bold italic_**.

Here is ~~strikethrough~~ text and here is `inline code`.!!!

## Links

- [dev.to homepage](https://dev.to)
- Autolinked URL: https://dev.to
- [Link with title](https://dev.to 'dev.to - Community for developers')

## Image

![Profile picture](../assets/profile.png)

## Blockquotes

> This is a blockquote.
>
> It can span multiple lines.

> Nested blockquotes:
>
> > Are they supported?
> >
> > > How deep can we go?

## Lists

### Unordered

- Item one
- Item two
  - Nested item
    - Deeply nested item
- Item three

### Ordered

1. First
2. Second
   1. Sub-item A
   2. Sub-item B
3. Third

### Task List

- [x] Completed task
- [ ] Incomplete task
- [ ] Another thing to do

## Code Blocks

Inline: `console.log("hello")`

Fenced with syntax highlighting:

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55
```

```python
def greet(name: str) -> str:
    """Return a greeting."""
    return f"Hello, {name}!"

print(greet("dev.to"))
```

```csharp
public record Person(string Name, int Age);

var people = new List<Person>
{
    new("Alice", 30),
    new("Bob", 25)
};

var adults = people.Where(p => p.Age >= 18).ToList();
```

```bash
#!/bin/bash
for i in {1..5}; do
  echo "Iteration $i"
done
```

No language specified:

```
Just plain preformatted text.
No highlighting here.
```

## Tables

| Feature       | Supported? | Notes                 |
| ------------- | :--------: | --------------------- |
| Bold          |    Yes     | `**text**`            |
| Italic        |    Yes     | `*text*`              |
| Strikethrough |    Yes     | `~~text~~`            |
| Tables        |    Yes     | You're looking at one |
| Task lists    |    Yes     | `- [x]` / `- [ ]`     |
| Footnotes     |   Maybe    | Platform-dependent    |

Right-aligned and left-aligned columns:

| Left-aligned | Center-aligned | Right-aligned |
| :----------- | :------------: | ------------: |
| Left         |     Center     |         Right |
| 1            |       2        |             3 |
| foo          |      bar       |           baz |

## Horizontal Rules

Three different syntaxes:

---

---

---

## HTML Elements (if supported)

<details>
<summary>Click to expand</summary>

This content is hidden behind a collapsible section.

- Bullet inside details
- Another one

```json
{
  "hidden": true,
  "surprise": "code block inside details"
}
```

</details>

<kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.

Superscript: x<sup>2</sup> + y<sup>2</sup> = z<sup>2</sup>

Subscript: H<sub>2</sub>O

## dev.to Liquid Tags

### Embed a dev.to post

{% link https://dev.to/devteam/welcome-thread-v0-b90 %}

### YouTube embed

{% youtube dQw4w9WgXcQ %}

### GitHub repo embed

{% github forem/forem %}

### A simple tag for fun

{% tag markdown %}

## Escaping

\*Not italic\* and \`not code\`

Literal pipe in text: \|

## Long Paragraph

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
culpa qui officia deserunt mollit anim id est laborum.

## Footnotes

This might work[^1], or it might not[^2].

[^1]: Footnotes are supported in some markdown parsers.

[^2]: dev.to uses a custom markdown pipeline, so results may vary.

## Definition-Style (Probably Unsupported)

Term : Definition of the term

Another term : Its definition

## Math (if KaTeX is supported)

Inline math: $E = mc^2$

Block math:

$$
\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

---

That's the full stress test! Check which features rendered correctly on dev.to.
