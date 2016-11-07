# Sidewalkjs
Tool for controlling LED sidewalk

## Quick Start
Clone repository:
<br>
```git clone https://github.com/paullucas/sidewalkjs```
<br>
Change current directory:
<br>
```cd sidewalkjs```
<br>
Install dependencies:
<br>
```npm i```
<br>
In <a href="https://github.com/paullucas/sidewalkjs/blob/master/main.js#L2">main.js</a>, you will need to modify the arguments supplied to the config function:
<br>
```const sidewalk = config(13, 62, "192.168.1.51", 7890)```
<br>
Run the application:
<br>
```npm start```

### Config Function Arguments
Argument | Type | Meaning | Required? | Default
--- | --- | --- | --- | --- |
Width | Integer | Width (in pixels) of LED sidewalk | True | None |
Height | Integer | Height (in pixels) of LED sidewalk | True | None |
IP | String | IP Address of the OPC endpoint | False | 192.168.1.51 |
Port | Integer | Port of the OPC endpoint | False | 7890 |
