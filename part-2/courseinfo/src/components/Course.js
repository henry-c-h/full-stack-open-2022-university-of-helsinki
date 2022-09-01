const Header = ({ name }) => <h2>{name}</h2>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  const totalExercises = parts
    .map((part) => part.exercises)
    .reduce((acc, value) => value + acc, 0);

  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <strong>total of {totalExercises} exercises</strong>
    </>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

export default Course;
