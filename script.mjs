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

let gradesArr = [];

function getLearnerData(course, ag, submissions) 
{
  // here, we would process this data to achieve the desired result.
  let result = [];

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
  
  let asnmt = getAssignment(ag);
  let dueAsnmt = dueAssignments(asnmt);
  // console.log(dueAsnmt);
  let dueSubs = dueSubmissions(dueAsnmt, submissions);
  // console.log(dueSubs);
  let totalPoints = 0;
  let counter = 1;

  // for loop to iterate through each dued assignment
  for(let a = 0; a < dueAsnmt.length; a++)
  {
    counter = 0;
    // Sum of total possible points of dued assignments
    totalPoints += dueAsnmt[a].points_possible;
    // console.log(totalPoints);

    // for loop to iterate through Learner Submissions
    for(let l = 0; l < dueSubs.length; l++)
    {
      // console.log(counter);
      // If id from assignments and assignment_id from Learner Submission are the same:
      // ~ Determine is assignment was late
      // ~ Calculate the grade of the assignment
      if(dueAsnmt[a].id == dueSubs[l].assignment_id)
      {
        let late = islate(dueAsnmt[a].due_at, submissions[l].submission.submitted_at);

        let gradedasnmt = grade(submissions[l].submission.score, dueAsnmt[a].points_possible, late);
        gradedasnmt = gradedasnmt.toPrecision(2);
        console.log(`Score of graded assignment: ${gradedasnmt}`);

        console.log(`Due Assignment ID: ${dueSubs[l].learner_id}`);
        console.log(`Grades Array ID: ${gradesArr[counter].id}`)
        if(dueSubs[l].learner_id == gradesArr[counter].id)
        {
          //console.log(`Counter ${counter}`);
          // console.log(gradesArr[a].id);
          // console.log(dueSubs[l].assignment_id);
          console.log(gradesArr[counter][dueSubs[l].assignment_id] = gradedasnmt);
          console.log(gradesArr);
          counter++;
        }
        

        
      }
    }
  }

  //console.log(ag.assignments.length);

  
  return;
}



// Create array of objects with following:
// 1) keys of id and avg
  
getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
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
//     avg: 0.82, // (39 + 125) / (50 + 150)
//     1: 0.78, // 39 / 50
//     2: 0.833 // late: (140 - 15) / 150
//   }
// ];

// FUNCTIONS----------------------------------------------------------------------------------
// Function to calculate grades, if late, deduction 10% from score, otherwise score divided by total points
function grade(score, total, late)
{
  if(late)
      return (score - (total * 0.10)) / total;
  else
      return score / total;
}

// Function to get a sum for a given number array arguement
function sum(numsArr)
{
  let result = 0;

  for(let i = 0; i < numsArr.length; i++)
    result += numsArr[i];

  return result;
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
  else
    return 'Not Due';
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
  
  return result;
}

// Function accepts leaner submissions as argument and outputs array of objects of unique learner IDs
//learnerIDs(LearnerSubmissions);
function learnerIDs(submission)
{
  let uniqueIDs = [];
  let keys = [];

  // Iterate through submissions data to obtain learner IDs
  for(let i = 1; i < submission.length; i++)
    uniqueIDs.push(submission[i].learner_id);

  // Use Set() to find unique learner IDs
  uniqueIDs = [...new Set(uniqueIDs)];

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
function getAssignment(assignments)
{
  return assignments.assignments;
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