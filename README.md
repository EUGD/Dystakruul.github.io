# Dystakruul.github.io

This is a playground for small browser-based Tools, web-applications, and other web-API-tests.

These Projects are currently online:

- [Twitch Clip Viewer](https://dystakruul.github.io/DystasClipViewer/) [WIP]
- [ARG Tools](https://dystakruul.github.io/ARG_Tools/)
  - [SudokuOverlay](https://dystakruul.github.io/ARG_Tools/Cyberpunk2077/SudokuOverlay/)
  - [ClockCodeSolver](https://dystakruul.github.io/ARG_Tools/Cyberpunk2077/ClockCodeSolver/)

## ARG Tools

A collection of Tools I created and used while working on ARGs that I wanted to share with others

## Twitch Clip Viewer

**!!** currently, the only way to add streams as clip source is to edit the browser's LocalStorage manually **!!**

#### Popularity Rating

Currently, the formula for the popularity rating which determines the default sorting order is as follows:

<img src="https://latex.codecogs.com/gif.latex?\frac{1}{2}&space;*&space;v&space;\left&space;(&space;-&space;tanh&space;\left&space;(&space;\frac{2}{3}\,t&space;-&space;4&space;\right&space;)&space;&plus;&space;1&space;\right&space;)" title="\frac{1}{2} * v \left ( - tanh \left ( \frac{2}{3}\,t - 4 \right ) + 1 \right )" />

where ***t*** is the time since clip creation in days and ***v*** is the number of views of the clip
