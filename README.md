# nodejs-express-graphql

Quick Node Express GraphQL implementation.  



### Client GraphQL Queries
```graphql
query getSingleCourse($courseID: Int!){
  course(id: $courseID) {
    id
    title
    author
    url
    topic
  }
}

query getCoursesByTopic($courseTopic: String){
  courses(topic: $courseTopic) {
    id
    title
    author
    url
  }
}

query getCoursesWithFragments($courseId1: Int!, $courseId2: Int!){
  course1: course(id: $courseId1){
		...courseFields
  }
  course2: course(id: $courseId2){
		...courseFields
  }
}

mutation updateCourseTopic($id: Int!, $topic: String!){
  updateCourseTopic(id: $id, topic: $topic){
    ...courseFields
  }
}

fragment courseFields on Course {
  id
  title
  author
  url
  topic
}

```
