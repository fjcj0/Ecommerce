import axios from 'axios';
import { NextResponse } from 'next/server';
const countriesList = [
    "United States", "Canada", "United Kingdom", "Australia", "Germany",
    "France", "Italy", "Spain", "Japan", "China", "India", "Brazil",
    "Mexico", "South Korea", "Netherlands", "Switzerland", "Sweden",
    "Norway", "Denmark", "Finland", "Ireland", "Portugal", "Greece",
    "Turkey", "Russia", "South Africa", "Egypt", "Saudi Arabia",
    "United Arab Emirates", "Singapore", "Malaysia", "Thailand",
    "Vietnam", "Indonesia", "Philippines", "New Zealand", "Belgium",
    "Austria", "Poland", "Hungary", "Czech Republic", "Romania",
    "Ukraine", "Qatar", "Kuwait", "Oman", "Bahrain",
    "Jordan", "Lebanon", "Morocco", "Algeria", "Tunisia", "Kenya",
    "Nigeria", "Ghana", "Ethiopia", "Argentina", "Chile", "Colombia",
    "Peru", "Venezuela", "Ecuador", "Costa Rica", "Panama", "Dominican Republic",
    "Puerto Rico", "Jamaica", "Trinidad and Tobago", "Bangladesh", "Pakistan",
    "Sri Lanka", "Nepal", "Myanmar", "Cambodia", "Laos", "Mongolia",
    "Kazakhstan", "Uzbekistan", "Azerbaijan", "Georgia", "Armenia",
    "Belarus", "Moldova", "Serbia", "Croatia", "Slovenia", "Slovakia",
    "Lithuania", "Latvia", "Estonia", "Iceland", "Luxembourg", "Malta",
    "Cyprus", "Montenegro", "Albania", "Macedonia", "Bosnia and Herzegovina",
    "Kosovo", "Andorra", "Monaco", "San Marino", "Liechtenstein",
    "Vatican City", "Taiwan", "Hong Kong", "Macau", "Palestine",
    "Western Sahara", "Djibouti", "Eritrea", "Somalia", "Sudan",
    "South Sudan", "Chad", "Niger", "Mali", "Mauritania", "Senegal",
    "Gambia", "Guinea", "Guinea-Bissau", "Sierra Leone", "Liberia",
    "Ivory Coast", "Burkina Faso", "Togo", "Benin", "Cameroon",
    "Central African Republic", "Republic of the Congo", "Democratic Republic of the Congo",
    "Uganda", "Rwanda", "Burundi", "Tanzania", "Malawi", "Zambia",
    "Zimbabwe", "Botswana", "Namibia", "Lesotho", "Eswatini",
    "Madagascar", "Mauritius", "Comoros", "Seychelles", "Fiji",
    "Papua New Guinea", "Solomon Islands", "Vanuatu", "Samoa",
    "Tonga", "Kiribati", "Micronesia", "Palau", "Marshall Islands",
    "Nauru", "Tuvalu"
].sort();
export async function GET() {
    try {
        console.log('Fetching countries...');
        try {
            const res = await axios.get('https://restcountries.com/v3.1/all');
            const countries = res.data.map((country: any) => country.name.common).sort();
            return NextResponse.json(countries.map((name: string) => ({ name })));
        } catch (externalError) {
            console.log('External API failed, using fallback countries');
            return NextResponse.json(countriesList.map(name => ({ name })));
        }
    } catch (error: unknown) {
        console.log('Countries fetch error:', error);
        return NextResponse.json(countriesList.map(name => ({ name })));
    }
}