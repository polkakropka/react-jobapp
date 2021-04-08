export const convertToLink = (name: string): string => (
    name.toLocaleLowerCase().split(' ').join('-').replace(/[^a-zA-Z0-9]/g,'_')
)

export const convertDateString = (date: string): string => {
    let dateObj = new Date(date);
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return dateObj.getDate() +' ' + (monthNames[dateObj.getMonth()]) + ' '+ dateObj.getFullYear();
}
