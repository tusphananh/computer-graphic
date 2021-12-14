// eslint-disable-next-line no-sparse-arrays
export const Lesson = [
  {
    id: 1,
    title: "Variables",
    content:
      "JavaScript variables can hold different data types: numbers, strings, objects and more : \n let length = 16; // Number \n let lastName = 'Johnson';  // String \n let x = {firstName:'John', lastName:'Doe'};  // Object \n In this session you need to declare a variable name 'step' with the value of 2 ",
    editorValue: "\n for (let i = 0; i < step; i++) { moveForward() }",
  },
  {
    id: 2,
    title: "Functions",
    content:
      "In this lesson, we will learn about function in JavaScript \n A JavaScript function is a block of code designed to perform a particular task. \n A JavaScript function is executed when something invokes it (calls it). \n Use these 3 functions: \n  1. moveForward() \n 2. rotateLeft()  \n 3. rotateRight() \n",
    editorValue: "",
  },
  {
    id: 3,
    title: "For Loop",
    content:
      "Loops are handy, if you want to run the same code over and over again, each time with a different value. \n for (let i = 0; i < 10; i++) { \n  // Count to ten \n } \n Let's use this syntax and combine with previous function wirite a script to control the chracter's movement. \n",
    editorValue: "",
  },
  {
    id: 4,
    title: "Arrays",
    content: `An array is a special variable, which can hold more than one value: \n const cars = ['Saab', 'Volvo', 'BMW']; \n In this session you need to declare an array name 'moveArray' and add move functions to it then combine with previous 'For Loop' and wirite a script to control the chracter's movement. \n`,
    editorValue: "",
  },
  {
    id: 5,
    title: "If Statement",
    content:
      "Use the if statement to specify a block of JavaScript code to be executed if a condition is true. \n if (condition) { \n  // block of code to be executed if the condition is true \n } \n Use the else statement to specify a block of code to be executed if the condition is false. \n if (hour < 18) { \n  greeting = 'Good day';\n } else \n{ \n  greeting = 'Good evening';\n} \n  In this session you need to combine Array, For Loop and If Else statement to control the character. \n Create an Array and Loop it if an integer is divisible by 3 let's rotateLeft() if an integer is divisible by 5 let's rotateRight() and if an integer is divisible by both 3 and 5 let's moveForward()",
    editorValue: "",
  },
];
