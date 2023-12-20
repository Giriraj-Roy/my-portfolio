import React from 'react'

const Skills = () => {
  const skills=[
    {
      id: 1,
      name: "HTML5",
      strength: 9,
    },
    {
      id:2,
      name: "React JS",
      strength: 9,
    },
    {
      id:3,
      name: "CSS",
      strength: 9,
    },
    {
      id: 4,
      name: "JavaScript",
      strength: 9,
    },
    {
      id: 5,
      name: "C++",
      strength: 9,
    },
    {
      id: 6,
      name: "Python",
      strength: 9,
    },

  ]
  
  return (
    <div>
      <h2>Skills</h2>
      <div>
        {
          skills.map((ele)=>{
            return (
              <div key={ele.id}>
                <p>{ele.name} - {ele.strength}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Skills
