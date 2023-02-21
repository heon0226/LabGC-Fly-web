const getStatus = (register) => {
    let status = '';
    if ((register & 0x0001) !== 0) status += 'HiZ';
    if (register & 0x0004) status += ' SW_F';
    if (register & 0x0008) status += ' SW_EVN';
    if (register & 0x0080) status += ' NOTPERF_CMD';
    if (register & 0x0100) status += ' WRONG_CMD';
    if (!(register & 0x0200)) status += ' UVLO';
    if (!(register & 0x0400)) status += ' TH_WRN';
    if (!(register & 0x0800)) status += ' TH_SD';
    if ((register & 0x1000) === 0) status += ' OCD';
    if (!(register & 0x2000)) status += ' STEP_LOSS_A';
    if (!(register & 0x4000)) status += ' STEP_LOSS_B';

    return status;
}
export default getStatus;

