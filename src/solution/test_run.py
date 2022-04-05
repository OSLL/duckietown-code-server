import subprocess
from pathlib import Path
import logging
import os

RUN_COMMAND = "dts devel run --workdir {dir} -M -s -f -H {hostname} --"
logging.basicConfig(level=logging.INFO)


def run_template_ros_core(hostname: str, directory: Path, log: Path) -> None:
    logging.info(f"RUN template for hostname [{hostname}], directory [{directory}]")
    with open(log.absolute(), 'w') as file:
        # clean directory on local machine
        #----------------------------------------
        # copy directory from bot to local machine
        logging.info(
            f"COPY template dir from hostname [{hostname}]")
        dir = str(directory.absolute())
        COPY_COMMAND = f'rsync --rsh="sshpass -p quackquack ssh -o StrictHostKeyChecking=no -l duckie" --archive duckie@{hostname}.local:/code/template-ros-core/ {dir}'
        os.system(COPY_COMMAND)
        # run solution
        subprocess.Popen(RUN_COMMAND.format(
            dir=str(directory.absolute()),
            hostname=hostname
        ).split(), stdout=file, stderr=file)


if __name__ == '__main__':
    run_template_ros_core("autobot10", Path("/home/i/template-ros-core"), Path("./logs.txt"))
