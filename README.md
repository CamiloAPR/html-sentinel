# Introducing: HTML Sentinel 🔎🦟❌

HTML Sentinel is a helpful HTML regression tool specifically designed for web developers, who like me, have struggled comparing HTML snapshots to make sure its safe to push a large site-wide change to prod. This tool will help you compare the HTML generated by your changes before pushing without having to spend too much time. it works for two main scenarios:

- Comparing git branches of the same site locally.
- Comparing two different environments of a website.

Its primary purpose is to catch HTML changes that might go unnoticed until they cause issues on live sites. By utilizing a JSON file, you can easily configure and set up the tool according to your needs. This would hopefully simplify your web development workflow when rolling out large optimizations or sitewide improvements.

The code its fairly simple, straight to the chase with room for improvement.

## Support

If this tool helped you at work consider [donating](https://ko-fi.com/E1E0NCNON)!

## Installation

1. Set up the crawler:
   1.1. install dependecies `npm i`.
   1.2. Create `settings.json` to fit your needs. use `settings-template.json` as an example.

2. Set up the web:
   2.1. install dependecies `cd ./web && npm i`.

## FAQ and Troubleshooting

### The report is freezing on the browser?

// its likely that there are too many differences. This is something I to be fixed.

### Is there a Roadmap for this project?

// Yes and no.

### What do I do if I want to contribute?

// Post your issues or create a Pull Request with your ideas.

### Why React.js for the reports isn't it a little bit overkill?

// Yes. when I first built this tool (2021) I just wanted to explore React and this seemed like a good opportunity.
