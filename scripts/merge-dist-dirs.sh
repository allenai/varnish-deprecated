#!/usr/bin/env bash
# The Shellac files currently get output to `dist_varnish/`, since something
# in antd's build tooling deletes all of `dist/` prior to it's generation.
#
# This scripts merges the `dist_varnish/` files into `dist/` so that this
# isn't exposed to end users.
set -e
dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cp dist_varnish/* dist/.
