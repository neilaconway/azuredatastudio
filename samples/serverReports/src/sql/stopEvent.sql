--Stops the XEvent Sessions
DROP EVENT SESSION [PageContention] ON SERVER
DROP EVENT SESSION [ObjectContention] ON SERVER
SELECT 0 AS RESULTCODE, 'XEvent sessions PageContention and ObjectContention removed' AS RESULTMSG
