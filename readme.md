
RCON

possible rcon package as alternative
https://www.npmjs.com/package/rcon-ts

RCON
Set the RCON password in the rconpw file. A random password is generated if rconpw doesn't exist.

To change the password, stop the server, modify rconpw, and restart the server.

To "disable" RCON don't expose port 27015, i.e. start the server without -p 27015:27015/tcp. RCON is still running, but nobody can to connect to it.