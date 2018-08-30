# Debugging

For debugging in a dev environment, Thumbor can be started with a ```--log-level=debug```

E.g in supervisor:

```
[program:my_thumbor]
command=/path/to/thumbor --port=1234 --ip=127.0.0.1 --conf=/etc/thumbor/my_thumbor.conf --log-level=debug
# other options
...
stderr_logfile=/var/log/supervisor/my_thumbor.stderr.log
```
Once that's running, tail the log while you are requesting images to see where issues are occurring.

Thumbor will return 404 response codes on error.
