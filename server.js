const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');

//graphql schema
const schema = buildSchema(`
  type Query{
    course(id: Int!): Course
    courses(topic: String): [Course]
  }
  type Course {
    id: Int
    title: String
    author: String
    description: String
    topic: String
    url: String
  }
  type Mutation {
    updateCourseTopic(id: Int!, topic: String!): Course
  }
`);

var coursesData = [
  {
    id: 1,
    title: 'The Complete Node.js Developer Course',
    author: 'Andrew Mead, Rob Percival',
    description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
    topic: 'Node.js',
    url: 'https://codingthesmartway.com/courses/nodejs/'
  },
  {
    id: 2,
    title: 'Node.js, Express & MongoDB Dev to Deployment',
    author: 'Brad Traversy',
    description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
    topic: 'Node.js',
    url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
  },
  {
    id: 3,
    title: 'JavaScript: Understanding The Weird Parts',
    author: 'Anthony Alicea',
    description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
    topic: 'JavaScript',
    url: 'https://codingthesmartway.com/courses/understand-javascript/'
  }
];

function getCourse(args){
  const id = args.id;
  return coursesData.filter(course => course.id == id)[0];
}

function getCourses(args){
  const topic = args.topic;
  if(topic){
    return coursesData.filter(course => course.topic == args.topic);
  }
  return coursesData;
}

function updateCourseTopic({id, topic}){
  coursesData.map(course => {
    if(course.id === id) {
      course.topic = topic;
      return course;
    }
  });
  return coursesData.filter(course => course.id === id)[0];
}

const rootValue = {
  course: getCourse,
  courses: getCourses,
  updateCourseTopic: updateCourseTopic
};

const app = express();

app.use('/graphql', express_graphql({
  schema: schema,
  rootValue: rootValue,
  graphiql:true
}));

app.listen(5000, () => console.log('GraphiQL running on 127.0.0.1:5000/graphql'));


// query getSingleCourse($courseID: Int!){
//   course(id: $courseID) {
//     id
//     title
//     author
//     url
//     topic
//   }
// }
//
// query getCoursesByTopic($courseTopic: String){
//   courses(topic: $courseTopic) {
//     id
//     title
//     author
//     url
//   }
// }
//
// query getCoursesWithFragments($courseId1: Int!, $courseId2: Int!){
//   course1: course(id: $courseId1){
// 		...courseFields
//   }
//   course2: course(id: $courseId2){
// 		...courseFields
//   }
// }
//
// mutation updateCourseTopic($id: Int!, $topic: String!){
//   updateCourseTopic(id: $id, topic: $topic){
//     ...courseFields
//   }
// }
//
// fragment courseFields on Course {
//   id
//   title
//   author
//   url
//   topic
// }
//
