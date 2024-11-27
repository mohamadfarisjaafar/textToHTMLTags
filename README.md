# textToHTMLTags
Convert text to HTML tags


1. This program is in NodeJS
2. Please setup NodeJS to run this code
3. To run :
4.   create input.txt(contain text)
5.   cd to file
6.   run node node textToHTMLTags.js
7.   result = new output.txt will be generated

Scenario :

Input:

table
  thead
    tr
      td Heading 1
      td Heading 2
  tbody
    tr 
      td Body 1
      td Body 2

      
Output:

<table>
  <thead>
    <tr>
      <td>
        Header 1
      </td>
      <td>
        Header 2
      </td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        Body 1
      </td>
      <td>
        Body 2
      </td>
    </tr>
  </tbody>
</table>
