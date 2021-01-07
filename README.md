# Intertype-Relations-Mapper-V1

## Overview & Purpose

According to MBTI and socionics theory, there are 8 cognitive functions, and 16 cognitive types
which have different function "stacks" (that is, the ordering of the cognitive functions according 
to usage/preference/ability differs from type to type). 

According to socionics interytype relations theory, we can (very roughly!) predict the chemistry
between two types based on their function stacks.

This program allows you to map out the relations between multiple types spatially. It is useful for
seeing the relationships among a group of people, as opposed to traditional MBTI dating apps, which 
are only useful for seeing the relationship between two individuals.

## User Interface

Basically, you create boxes (which represent types) and draw lines between them to map out relations. When running the program, see the instructions for more information.

In this program, accpetable type code formats are MBTI and Socionics format. So ISTP and LSI are
acceptable, but ISTj is not. You can intermix formats (ex: have one box as ISTP and another as SEE).

Cool features:
 - you can drag the boxes around, and the lines will automatically move with them
 - if you change the type of a box, all the corresponding lines will change color accordingly
 - if you delete a box or type in an invalid type, all the lines previously connected to the box will disappear

## How it works

Each box represents a Type object. Since you can determine the rest of the function stack from the 
first two functions, each Type object only stores the first two functions. A Calculator object, 
created when a line is drawn between two objects, compares one type (the first selected box) to 
another (the second selected box).

The cognitive functions are represented as "serial numbers" -- that is, a 3 digit number for which 
each digit gives us some information about the function represented:

- First digit: 1 for juding, 9 for percieving
- Second digit: 1 for thinking/intuition, 0 for feeling/sensing
- Third digit: 1 for introverted, 0 for extraverted

For example, 111 represents Ti, 900 is Se, 911 is Ni, and 100 is Fe
  
This makes type comparison quite elegant, allowing comparison of two serial numbers to be
generalized (see [getRelation function](calculator.js)).

## About the creator
I'm a high school student interested in typology. I first made an intertype relations
calculator [here](https://repl.it/@RuthBerkun/Intertype-Relations-Calculator#Calculator.java) but then
quickly realized it would be difficult to map out relations between multiple types in Java. I thought
it would be easier (and cooler!) to map out relations spatially instead of just with text and resolved
to remix the calculator in HTML/CSS/JS someday. And after months of procrastinating from learning 
HTML/CSS/JS, someday has come! I'm still pretty new to HTML/CSS/JS so sorry the program is not that great
yet. I plan to learn HTML/CSS/JS, SVG, XML, and jQuery more in depth to create a better
version of this before college. My ultimate goal is to get this published as an independent website and/or app.

## Coming in future versions
1. Overall better look/design (buttons enlarge when hovered upon, different font, maybe a logo, etc)
2. Sidebar navigation
3. Templates and/or demo
4. Chart showing how many times each relation shows up 
5. Assign labels (ex: "mom" "bob") to boxes, not just types
6. Buttons for everything instead of always using esc, ctrl, etc
7. Save button so you can save your maps
