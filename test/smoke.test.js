"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const skillText = fs.readFileSync(path.join(root, "SKILL.md"), "utf8");

test("package.json and SKILL.md versions match", () => {
  const match = skillText.match(/^version:\s*(\S+)/m);
  assert.ok(match, "SKILL.md frontmatter version missing");
  assert.equal(match[1], pkg.version);
});

test("partner entry files are present", () => {
  for (const rel of ["SKILL.md", "install.sh", "bin/install.js", "README.md", "README.zh-CN.md"]) {
    assert.ok(fs.existsSync(path.join(root, rel)), `${rel} missing`);
  }
});

test("references are not empty", () => {
  const entries = fs.readdirSync(path.join(root, "references"));
  assert.ok(entries.length > 0, "references/ is empty");
});
