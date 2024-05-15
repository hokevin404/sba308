// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};
  
// The provided assignment group.
const AssignmentGroup = {
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
const LearnerSubmissions = [
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

function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
  try
  {
    if(course.id !== ag.course_id)
      throw `ERROR - Mismatched Course ID: \n${ag.name} ID:${ag.course_id} does not match ${course.name} ID:${course.id}`;
  } catch(error)
  {
    console.error(error);
    return;
  }


  
  return;
}

// Write function that accepts submissions
// outputs array of objects with unique learner id
// will use output for final results
learnerIDs(LearnerSubmissions);
function learnerIDs(submission)
{
  let uniqueIDs = [];
  for(let i = 1; i < submission.length; i++)
    uniqueIDs.push(submission[i].learner_id);

  uniqueIDs = [...new Set(uniqueIDs)];
  console.log(uniqueIDs);
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
function grade(score, total, late)
{
    if(late)
        return (score - total * 0.10) / total;
    else
        return score / total;
} 

function sum(...nums)
{
    return nums.reduce((a,b) => a + b, 0);
}

function quotient(leanerScore, totalScore)
{
    return leanerScore / totalScore;
}

function isDue(dueDate, submissionDate)
{
  return Date.parse(submissionDate) < Date.parse(dueDate);
}