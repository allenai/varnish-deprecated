# Vendor

In forking antd we discovered the need to also modify other `antd-design` tools that are distributed as separate packages. Rathern than figuring out how to fork and publish each of these we opted to instead commit their source code locally and modify things as necessary to use the local, patched version. This is a practice sometimes referred to as "vendoring".

We'll add a brief note for each package that we vendor here that explaining why we did so and the SHA that we originally pulled from when doing so.

## antd-tools

### Repository Metadata

**Repo**: https://github.com/ant-design/antd-tools<br> **SHA**: [9ba7fb9d6bbccd1b3721f16c5de2f81c387c82e](https://github.com/ant-design/antd-tools/commit/09ba7fb9d6bbccd1b3721f16c5de2f81c387c82e)<br>

### Why

We vendored this to patch hard-coded logic in `antd-tools` that maps `antd` import statements in local code paths. We did this to support renaming `antd` to `@allenai/varnish` in the code and importantly the example snippets we display to users in the associated documentation.
