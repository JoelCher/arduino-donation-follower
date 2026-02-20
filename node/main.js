// Really I just need a program that will keep on running and fetching the donation number, and when it changes, alert the arduino, then pass the number to the serail port...
import axios from "axios";
import * as child from "child_process";

//First start the arduino
let donation = 0;
async function fetchDonation() {
  const { data } = await axios.get(
    "https://matanotktanot.netinatlulav.com/api/purchase/get-donation-info",
    { headers: { "X-projectname": "matanotktanot", "X-year": "2026" } },
  );
  return data.totalDonation;
}

async function setNumber() {
  const newDonation = await fetchDonation();
  if (donation != newDonation) {
    donation = newDonation;
    console.log(newDonation);
    //Now pass this number
    //
    child.exec(
      "../arduino/insert-number.sh " + newDonation,
      (err, stdout, stderr) => {
        if (err) {
          // node couldn't execute the command
          return;
        }

        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      },
    );
  }
}

setNumber();

setInterval(() => {
  setNumber();
}, 3000);
