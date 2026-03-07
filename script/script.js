if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "./login/login.html"; // Redirect to login if not logged in
}

const logout=()=>{
    if(localStorage.getItem('isLoggedIn') === 'true'){
        console.log('probes koreche');
        window.location.href = "./index.html";
        localStorage.setItem('isLoggedIn', 'false');
    }
}

const handleSearch = () => {
    // https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=notifications
    handleSpinner(true);
    const searchId = document.getElementById('searchIssues');
    const value = searchId.value.trim().toLowerCase();
    console.log(value);
    if(value === ''){
        alert("Please type a value");
        handleSpinner(false)
        return;
    }else{
        const searchUrl = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${value}`
        fetch(searchUrl)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                totalCountData(data.data)
                displayServerIssuesData(data.data);
            })
            
        }
        handleSpinner(false);
}

const handleSpinner= (status)=>{
    if(status === true){
        document.getElementById('spinner').classList.remove('hidden');
        
    }else{
        document.getElementById('spinner').classList.add('hidden')
    }
}

const getServerIssuesData= () =>{
    handleSpinner(true);
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            totalCountData(data.data)
            displayServerIssuesData(data.data)
        
        })
}

const totalCountData= (data)=>{
    const headerTitleId = document.getElementById('header_title');
    const count = data.length
    headerTitleId.innerHTML = `
    <h2 class="font-bold text-[20px]">${count} Issues</h2>
    <p class="text-[#64748b]">Track and manage your project issues</p>
    `;
}


const displayServerIssuesData =(issues)=>{
    
    const sectionId = document.getElementById('section_body');
    sectionId.innerHTML = '';
    issues.forEach(item =>{
        sectionId.innerHTML += `
        <div onclick='handlePopUp(${item.id})' class="section_card  bg-white rounded-xl shadow-sm border-t-4 ${item.status === 'open' ? 'border-green-800' : 'border-blue-800' }">
                    <div class="card_header flex flex-row justify-between items-center p-4">
                        <img src=${item.status === 'open' ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"} alt="${item.status} Status icon">
                        <span class="badge badge-soft badge-warning">${item.priority}</span>
                    </div>
                    <div class="card_body space-y-2 p-4">
                        <h2 class="text-2xl font-bold">${item.title}</h2>
                        <p class=" text-[#64748b] line-clamp-2 ">${item.description}</p>
                        <div class="body_badge">
                           ${item.labels[0] ? `<span class="badge badge-warning text-[11px] uppercase"><i class="fa-solid fa-bug"></i>${item.labels[0]}</span>` : ''}
                           ${item.labels[1] ? `<span class="badge badge-success text-[11px] uppercase"><i class="fa-solid fa-handshake"></i>${item.labels[1]}</span>` : ''}
                        </div>
                    </div>
                    <hr class="border-gray-400">
                    <div class="card_footer space-y-2 p-4">
                        <p class=" text-[#64748b]">1# by : ${item.author}</p>
                        <p class=" text-[#64748b]">${item.updatedAt.split('T')[0]}</p>
                    </div>
                </div>
        `
    })
    handleSpinner(false)
    console.log(issues);
    
}

// const loadWordDetail = async (id) => {
//   const url = `https://openapi.programming-hero.com/api/word/${id}`;
//   const res = await fetch(url);
//   const details = await res.json();
//   displayWordDetails(details.data);
// };

const handlePopUp=(id)=>{
    console.log("Pop up Show...", id);
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayIssuesDetail(data.data))
    
}
// const displayWordDetails = (word) => {
//   console.log(word);
//   const detailsBox = document.getElementById("details-container");
//   detailsBox.innerHTML = `
//     <div class="">
//             <h2 class="text-2xl font-bold">
//               ${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${
//     word.pronunciation
//   })
//             </h2>
//           </div>
//           <div class="">
//             <h2 class="font-bold">Meaning</h2>
//             <p>${word.meaning}</p>
//           </div>
//           <div class="">
//             <h2 class="font-bold">Example</h2>
//             <p>${word.sentence}</p>
//           </div>
//           <div class="">
//             <h2 class="font-bold">Synonym</h2>
//             <div class="">${createElements(word.synonyms)}</div>
//           </div>
    
    
//     `;
//   document.getElementById("word_modal").showModal();
// };
const displayIssuesDetail= (issue)=> {
    console.log(issue);
    const detailsCard = document.getElementById('detail_container');
    detailsCard.innerHTML = '';
    const createElement = document.createElement('div');
    createElement.classList.add('space-y-4');
    createElement.innerHTML += `
                        <h1 class="text-2xl font-bold">${issue.title}</h1>
                        <div class="card_badge flex flex-row gap-8 justify-start items-center">
                            <span class="badge badge-success">${issue.status}</span> 
                            <li class="list-disc text-[#64748b]  text-[12px]"> Opened by : ${issue.author} </li>
                            <li class="list-disc text-[#64748b]  text-[12px]"> ${issue.updatedAt.split('T')[0]}</li>
                        </div>
                        <div class="badge_property">
                            <span class="badge badge-soft badge-success">${issue.labels[0]}</span>
                            <span class="badge badge-soft badge-warning">${issue.labels[1]}</span>
                        </div>
                        <p class="text-[#64748b]">${issue.description}</p>
                        <div class="card_client p-6 bg-[#f8fafc] flex flex-row">
                            <div class="w-1/2">
                                <p class="text-[#64748b]">Assignee:</p>
                                <h2 class="font-bold capitalize">${issue.assignee}</h2>
                            </div>
                            <div class="w-1/2">
                                <p class="text-[#64748b]">Priority:</p>
                                <span class="badge badge-error">${issue.priority}</span>
                            </div>

                        </div>
    `
    detailsCard.append(createElement);
    document.getElementById("word_modal").showModal();
    
}

const selected=(id)=>{
    console.log('button is clicked', id);
    

    document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'))
    
    
    if(id === 'open'){
        document.getElementById('open').classList.add('active');
        filteredData(id);
        handleSpinner(true);
    }
    else if(id === 'closed'){
        document.getElementById('close').classList.add('active');
        filteredData(id);
        handleSpinner(true);
    }else{
        document.getElementById('all').classList.add('active');
        filteredData(id);
        handleSpinner(true);

    }
}

const filteredData=(id)=>{
    console.log(id);
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const allIssues = data.data;
            if(id === 'open' || id === 'closed'){
                const filters = allIssues.filter(item => item.status === id);
                totalCountData(filters)   
                displayServerIssuesData(filters) 

            }else{
                totalCountData(allIssues)
                displayServerIssuesData(allIssues)
                
            }
            
            
        })
    handleSpinner(false);
}

getServerIssuesData();