#!/bin/sh
# wait-for-it.sh

set -e

host="$1"
shift
cmd="$@"

until nc -z -v -w30 $host; do
  echo "Waiting for $host..."
  sleep 1
done

exec $cmd
