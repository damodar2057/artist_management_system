//

import toastComponent from "../components/toast/toastComponent";


export function exportArtistDataToCSV(filename: string, data: any[]) {
    if (!data || data.length === 0){
        toastComponent("No data available to export")
        return
    }

    const header = Object.keys(data[0]).join(",") // extract headers
    const rows = data.map(obj => Object.values(obj).map(value => `"${value}"`).join(',')); 


    const csvData = [header, ...rows].join('\n')

    const blob = new Blob([csvData], { type: 'text/csv'})
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `${filename}.csv`
    link.click()
}

