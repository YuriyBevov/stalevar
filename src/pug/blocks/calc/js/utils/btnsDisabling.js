export function btnsDisabling(btns, state) {
  if(state) {
    btns.forEach(btn => {
      btn.setAttribute('disabled', true);
    });
  } else {
    btns.forEach(btn => {
      btn.removeAttribute('disabled');
    });
  }
}