from pathlib import Path
import subprocess
import logging
import os

logging.basicConfig(level=logging.INFO)

RUN_COMMAND = "dts devel run --workdir {dir} -M -s -f -H {hostname} --"
#COPY_COMMAND = "rsync --rsh=\"sshpass -p quackquack ssh -o StrictHostKeyChecking=no -l duckie\" --archive duckie@{hostname}.local:/code/template-ros-core/ {dir}"
logging.basicConfig(level=logging.INFO)


def run_template_ros_core(hostname: str, directory: Path, log: Path) -> None:
    with open(log.absolute(), 'w') as file:
        # copy directory from bot to local machine
        logging.info(
            f"COPY template dir from hostname [{hostname}]")
        dir = str(directory.absolute())
        COPY_COMMAND = f'rsync --rsh="sshpass -p quackquack ssh -o StrictHostKeyChecking=no -l duckie" --archive duckie@{hostname}.local:/code/template-ros-core/ {dir}'
        print(COPY_COMMAND)
        os.system(COPY_COMMAND)

        #file.write("Log for {}".format(hostname))
        #file.flush()
        # run solution
        logging.info(
            f"RUN template for hostname [{hostname}], directory [{directory}]")

        subprocess.Popen(RUN_COMMAND.format(
            dir=str(directory.absolute()),
            hostname=hostname
        ).split(), stdout=file, stderr=file)
    # send_start_command(hostname)


if __name__ == '__main__':
    run_template_ros_core("autobot07", Path("/home/i/template-ros-core"), Path("./logs.txt"))
