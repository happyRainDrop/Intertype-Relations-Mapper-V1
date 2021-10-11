# Intertype-Relations-Mapper-V1

## Note

This project is no longer being updated. You can try it out [here](https://intertype-relations-calculator.neocities.org/). Works on Chrome.

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

