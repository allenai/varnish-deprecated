#!/usr/bin/env python3

import subprocess
import os
import argparse
import json

def rename_module(content: str, new_name="@allenai/varnish") -> str:
    parsed = json.loads(content)
    assert parsed["name"] == "antd"
    parsed["name"] = new_name
    return json.dumps(parsed, indent=2)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(prog="release.py", description="A utility for releasing the " +
                                                                    "@allenai/varnish library.")
    parser.add_argument("--dry-run", action="store_true", help="If specified nothing will be published.")
    parser.add_argument("--dirty", action="store_true", help="If specified the check that ensures " +
                                                             "there's no uncommited changes is skipped.")

    args = parser.parse_args()

    root = os.path.join(os.path.dirname(__file__), os.path.pardir)

    # The order of these commands was derived from the original `pre-publish` script and
    # the order here: https://github.com/ant-design/antd-tools/blob/master/lib/gulpfile.js#L387
    # There's a few things we omit `check-git` and `package-diff` as AFAICT they're duplicative
    # of `check-commit`.
    cmds = [ "check-commit", "test-all", "version", "compile", "dist" ]
    if args.dirty:
        cmds = [ c for c in cmds if c != "check-commit" ]

    for cmd in cmds:
        subprocess.check_call([ "npm", "run", cmd ], cwd=root)

    # HACK (codeviking): If we change the name of the package in `package.json` and
    # `package-lock.json`, antd's build scripts fail for opaque reasons. We workaround that
    # by not changing the name until we're about ready to publish.
    with open(f"{root}{os.path.sep}package.json", "r+", encoding="utf-8") as pkg:
        with open(f"{root}{os.path.sep}package-lock.json", "r+", encoding="utf-8") as lock:
            orig_pkg_content = pkg.read()
            orig_lock_content = lock.read()

            # Change the name in both
            pkg.seek(0)
            pkg.write(rename_module(orig_pkg_content))
            pkg.truncate()

            lock.seek(0)
            lock.write(rename_module(orig_lock_content))
            lock.truncate()

            # Publish to NPM
            subprocess.check_call([ "npm", "publish", "--dry-run" if args.dry_run else None ])

            # Revert the name change
            pkg.seek(0)
            pkg.write(orig_pkg_content)
            pkg.truncate()

            lock.seek(0)
            lock.write(orig_lock_content)
            lock.truncate()

