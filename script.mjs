// The provided course information.
const CourseInfo = 
{
  id: 451,
  name: "Introduction to JavaScript"
};
  
// The provided assignment group.
const AssignmentGroup = 
{
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = 
[
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function getLearnerData(course, ag, submissions) 
{
  // here, we would process this data to achieve the desired result.
  let gradesArr = [];
  let totalPoints = 0;

  try
  {
    if(course.id !== ag.course_id)
      throw `ERROR - Mismatched Course ID: \n${ag.name} ID:${ag.course_id} does not match ${course.name} ID:${course.id}`;
  } catch(error)
  {
    console.error(error);
    return;
  }

  // Array of objects of Learner IDs
  gradesArr = learnerIDs(submissions);

  // Function to retreive assignments from ag object
  const asnmt = getAssignment(ag);

  // Function to retreive assignments that are due
  const dueAsnmt = dueAssignments(asnmt);

  // Function to retreive learner submissions that are due
  const dueSubs = dueSubmissions(dueAsnmt, submissions);

  // Array object holding Learner's Total Score 
  const learnerTotalScore = learnerTotal(dueSubs, learnerIDs(submissions));
  // console.log(learnerTotalScore);

  // for loop to iterate through each dued assignment
  for(let a = 0; a < dueAsnmt.length; a++)
  {
    let index = 0;
    // Sum of total possible points of dued assignments
    totalPoints += dueAsnmt[a].points_possible;
    // console.log(totalPoints);

    // for loop to iterate through Learner Submissions
    for(let l = 0; l < dueSubs.length; l++)
    {
      // console.log(index);
      // If id from assignments and assignment_id from Learner Submission are the same:
      // 1) Determine if assignment was late
      // 2) Calculate the grade of the assignment
      // console.log(`Due Assignmnent ID: ` + dueAsnmt[a].id);
      // console.log(`Learner Submission - Assignment ID: ` + dueSubs[l].assignment_id + `\n`);
      if(dueAsnmt[a].id == dueSubs[l].assignment_id)
      {
        // console.log(`Due Assignmnent ID: ` + dueAsnmt[a].id);
        // console.log(`Learner Submission - Assignment ID: ` + dueSubs[l].assignment_id + `\n`);
        // console.log(`Due Assignment: ` + dueAsnmt[a].due_at);
        // console.log(`Leaner Submission Turn-in: ` + submissions[l].submission.submitted_at + `\n`);
        let late = islate(dueAsnmt[a].due_at, dueSubs[l].submission.submitted_at);

        // console.log(`Is Late: ` + late);
        // console.log(`Learner score: ` + dueSubs[l].submission.score);
        // console.log(`Assignment total: ` + dueAsnmt[a].points_possible);
        let gradedasnmt = grade(dueSubs[l].submission.score, dueAsnmt[a].points_possible, late);
        // console.log(`Grade for Assignment: ` + gradedasnmt + `\n`);
        // console.log(`Grade for Asnmt ${submissions[l].assignment_id}: ` + gradedasnmt);
        gradedasnmt = gradedasnmt.toPrecision(2);
        // console.log(`Score of graded assignment: ${gradedasnmt}`);

        // console.log(`Due Assignment ID: ${dueSubs[l].learner_id}`);
        // console.log(`Grades Array ID: ${gradesArr[index].id}`)
        if(dueSubs[l].learner_id == gradesArr[index].id)
        {
          // console.log(gradesArr[a].id);
          // console.log(dueSubs[l].assignment_id);
          // console.log(gradesArr[index][dueSubs[l].assignment_id] = gradedasnmt);
          //console.log(gradesArr);
          gradesArr[index][dueSubs[l].assignment_id] = parseFloat(gradedasnmt);
          index++;
          continue;
        }        
      }
    }
  }

  // Pass Total Assigment Score, Learner's Total Score, and Learner Graded Assignment's into 
  // weightAvg Function 
  weightedAvg(totalPoints, learnerTotalScore, gradesArr);
  // console.log(`\n\nRESULTS:`)
  // console.log(gradesArr);
  return gradesArr;
}
  
let finalResult  = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(finalResult);
  
// RESULTS------------------------------------------------------------------------------------
// const result = [
//   {
//     id: 125,
//     avg: 0.985, // (47 + 150) / (50 + 150)
//     1: 0.94, // 47 / 50
//     2: 1.0 // 150 / 150
//   },
//   {
//     id: 132,
//     avg: 0.895, // (39 + 140) / (50 + 150)
//     1: 0.78, // 39 / 50
//     2: 0.833 // late: (140 - 15) / 150
//   }
// ];

// FUNCTIONS----------------------------------------------------------------------------------

// Function to calculate grades, if late, deduction 10% from score, otherwise score 
// divided by total points
function grade(score, total, late)
{
  if(late)
      return (score - (total * 0.10)) / total;
  else
      return score / total;
}

// Function to calculate a quotient
function quotient(leanerScore, totalScore)
{
    return leanerScore / totalScore;
}

// Function to get today's date
function currDate()
{
  let currentDate = new Date();
  currentDate = currentDate.toISOString().split('T')[0];

  return currentDate;
}

// Boolean function that returns true if submission was late, while false for on-time
function islate(dueDate, submissionDate)
{
  let currentDate = new Date();
  currentDate = currentDate.toISOString().split('T')[0];

  if(Date.parse(dueDate) <= Date.parse(currentDate))
    return Date.parse(submissionDate) > Date.parse(dueDate);
}

// Function to remove on-going assignments
function dueAssignments(assignments)
{
  let results = [];
  let currentDate = currDate();

  for(let i = 0; i < assignments.length; i++)
  {
    let dueDate = assignments[i].due_at;
    if(dueDate < currentDate)
      results.push(assignments[i])
  }

  return results;
}

// Function to remove submissions of on-going assignments
function dueSubmissions(dueAssignmentIDs, submissions)
{
  let result = [];

  for(let x = 0; x < submissions.length; x++)
  {
    for(let y = 0; y < dueAssignmentIDs.length; y++)
    {
      if(submissions[x].assignment_id == dueAssignmentIDs[y].id)
        result.push(submissions[x]);
    }
  }
  // console.log(result);
  // console.log(`\n`);
  return result;
}

// Function that accepts leaner submissions as argument and returns an 
// array of objects of unique learner IDs 
// learnerIDs(LearnerSubmissions); // Test 
function learnerIDs(submission)
{
  let uniqueIDs = [];
  let keys = [];

  // console.log(submission);
  // Iterate through submissions data to obtain learner IDs
  for(let i = 1; i < submission.length; i++)
    uniqueIDs.push(submission[i].learner_id);

  // console.log(uniqueIDs);

  // Use Set() to find unique learner IDs
  uniqueIDs = [...new Set(uniqueIDs)];
  // console.log(uniqueIDs);

  // for loop to create array of 'id' to use in key:value map
  for(let x = 0; x < uniqueIDs.length; x++)
    keys.push('id');
  
  // Map array of 'id' to each learner ID
  // Results in array of objects
  let result = keys.map((key, index) => ({ [key]: uniqueIDs[index] }));
  // console.log(result);

  return result;
}

// Function to get assignment information
// Returns array of objects
function getAssignment(assignments)
{
  return assignments.assignments;
}

// Function to get sum total of learner scores
// Returns an array of objects
function learnerTotal(dueSubmissions, learnerIDs)
{
  let result = [];

  // Make a copy of learnerIDs
  Object.assign(result, learnerIDs);
  
  // Initialize a new key:value of total: 0 to all learnerIDs array of objects
  result.forEach(element => 
  {
    element['total'] = 0
  });

  //console.log(result);

  // Nested for loop to iterate both array of objects: results and dueSubmissions
  for(let x = 0; x < result.length; x++)
  {
    for(let y = 0; y < dueSubmissions.length; y++)
    {
      // If learner's ID match from results and dueSubmissions:
      // add to the sum of assignment score to the 'total' key
      if(result[x].id === dueSubmissions[y].learner_id)
        result[x]['total'] += dueSubmissions[y].submission.score;
    }
  }
  return result;
}

// Function to add weighted average to Array of Student scores and ID
function weightedAvg(totalAsnmtScore, learnerTotalArr, finalArr)
{
  let result = [];
  let avg = 0;

  // Iterate through Learner grades and calculate their weighter average
  for(let x = 0; x < learnerTotalArr.length; x++)
  {
    // console.log(`Learner's Total Score: ` + learnerTotalArr[x].total);
    // console.log(`Total Score of Assignments: ` + totalAsnmtScore);
    avg = quotient(learnerTotalArr[x].total, totalAsnmtScore)
    // console.log(avg);
    finalArr[x]['avg'] = parseFloat(avg.toPrecision(3));
  }

  // console.log(finalArr);
} 

// Function accept assignmentgroup as argument and outputs assignment id, due date, and possible points in an array

  // // try catch to check for numbers and not dividing by 0
  // try
  // {
  //   if(total == 0 && score > 0)
  //     throw `ERROR - Divide by 0: \nPlease check possible points for grades.`
  //   else if(isNaN(total) || isNaN(score))
  //     throw `ERROR - Not a number: \nPlease check numbers for grades.`
  // } catch(error)
  // {
  //     console.log(error);
  //     return;
  // }