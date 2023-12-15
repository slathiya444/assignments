/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {

  // Converting strings in lowercase and making a list of all chars, and then sorting them in asc
  s1 = str1.toLowerCase().split("").sort();
  s2 = str2.toLowerCase().split("").sort();


  // If the length of both the strings are not equal, then there might be one or more characters
  // are more in one of the string, hence return false
  if (s1.length != s2.length){
    return false
  }

  // Checking if character in sorted lists are same
  for (let i=0; i<s1.length; i++){
    if((s1[i] != s2[i])){
      return false
    }
  }
  
  return true

}

module.exports = isAnagram;
