# Widget

## Most simple static widget

This (code in /src1) is the most basic widget. Even though it needs to use the Service Marketplace interface as well, to be activated through the service marketplace. 
It has absolutely no function besides displaying a static text.

## Widget with interaction

To get a feeling, what is possible with widgets, this tutorial (src2) shows the interaction with a widget. A widget with an input field just echos the field on a click.
But: The action is called again and in principle anything can be performed, such as actuating devices or getting data.

## Widget with D3 graph

To furthermore improve the widget, also detailed graphs can be displayed. 
For the previous actions, always the standard template `v1` has been used. For this action, we need to select the `d3` template for the widget. This template has the D3.js library in version 5 preloaded https://d3js.org/ .

This behavior is the same for the service marketplace. If you select the d3 template there, you can also use D3.js in the Service Marketplace modal popup.
