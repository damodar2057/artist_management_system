// // Update user details
// document.querySelectorAll('#user-table .update-btn').forEach(btn => {
//     btn.addEventListener('click', async ev=> {
//        ev.preventDefault()
//        const userId = (ev.target as HTMLElement).getAttribute('data-id') as string;
//        console.log(`Update request user id is ${userId}`)
//        const user = await userApiManager.getUserById(userId)
//        contentContainer.innerHTML =   loadUpdateUserDetailsComponent(user)
//     })
// })


// function updateRecords (content)