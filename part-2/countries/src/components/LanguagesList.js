const LanguagesList = ({ languages }) => {
  return (
    <ul>
      {Object.values(languages).map((language) => {
        return <li key={language}>{language}</li>;
      })}
    </ul>
  );
};

export default LanguagesList;
