fetch("./json/data.json")
    .then(res => res.json())
    .then(data => {
        populateProjects(data)
    })
    .catch(err => {
        console.error(err)
        // put in an "Oops.. something went wrong. Try refreshing the page to view projects!"
    })

function populateProjects(data) {
    // console.log(data)
    const projectsContainer = document.querySelector('#projectsContainer')
    let output = ''

    for (let i = 0; i < data.length; i++) {
        let projectName = data[i].projectName
        let projectOverview = data[i].projectOverview

        let projectHighlights = returnProjectHighlights()

        function returnProjectHighlights() {
            let highlights = '<ul>'
            for (let j = 0; j < data[i].projectHighlights.length; j++) {
                highlights += `<li>${data[i].projectHighlights[j]}</li>`
            }
            highlights += '</ul>'
            return highlights
        }

        let projectNotes = ''
        data[i].projectNotes ? projectNotes = data[i].projectNotes : ''

        let projectTools = returnProjectTools()

        function returnProjectTools() {
            let tools = ''
            for (let j = 0; j < data[i].projectTools.length; j++) {
                tools += `<li class="language">${data[i].projectTools[j]}</li>`
            }
            return tools
        }

        let githubLink = ''
        data[i].githubLink ? githubLink = `<a href="${data[i].githubLink}"><i class="fab fa-github-square"></i></a>` : ''

        let demoLink = ''
        data[i].demoLink ? demoLink = `<a href="${data[i].demoLink}"><i class="fas fa-external-link-square-alt"></i></a>` : ''

        let figmaLink = ''
        data[i].figmaLink ? figmaLink = `<a href="${data[i].figmaLink}"><i class="fab fa-figma"></i></a>` : ''

        let projectImgLink = data[i].projectImgLink

        output += `
            <div class="projects__container">
                <div class="project__img">
                    <img src="${projectImgLink}" alt="${projectName}">
                </div>
                <div class="project__description">
                    <div class="description-text">
                        <h2>${projectName}</h2>
                        <p>${projectOverview}</p>

                        ${projectHighlights}
                       
                        <p>${projectNotes}</p>
                    </div>


                    <div class="project__info">
                        <ul class="project__languages">
                            ${projectTools}
                        </ul>
                        <div class="project__links">
                            ${githubLink}
                            ${figmaLink}
                            ${demoLink}
                        </div>
                    </div>
                </div>
            </div>`

        projectsContainer.innerHTML = output
    }
}