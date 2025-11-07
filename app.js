  //Create a function that takes a number as an argument and returns a grade based on that number.

  function grader(score) {

 //We created a function where the score was 1 and anything less than 1 had to return a letter from 'A-F'
 
  function grader(score) {
  if (score>1||score<0.6) return 'F'
  if (score<0.7) return 'D'
  if (score<0.8) return 'C'
  if (score<0.9) return 'B'
  return 'A'
}
}