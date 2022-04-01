import subprocess
from pathlib import Path
import logging
import os
#hostname = ""
#dir = ""
BUILD_COMMAND = "dts devel build --workdir {dir} -H {hostname}.local -f"
#COPY_COMMAND = f"rsync --rsh='sshpass -p quackquack ssh -o StrictHostKeyChecking=no -l duckie' --archive duckie@{hostname}.local:/code/template-ros-core/ {dir}"
logging.basicConfig(level=logging.INFO)


def build_template_ros_core(hostname: str, directory: Path, log: Path) -> None:
    logging.info(f"BUILD template for hostname [{hostname}], directory [{directory}]")
    with open(log.absolute(), 'w') as file:
        # copy directory from bot to local machine
        '''
        subprocess.Popen(COPY_COMMAND.format(
            hostname=hostname,
            dir=str(directory.absolute())
        ).split(), stdout=file, stderr=file)
        '''
        dir = str(directory.absolute())
        COPY_COMMAND = f'rsync --rsh="sshpass -p quackquack ssh -o StrictHostKeyChecking=no -l duckie" --archive duckie@{hostname}.local:/code/template-ros-core/ {dir}'
        os.system(COPY_COMMAND)
        #subprocess.Popen(COPY_COMMAND.split())

        #file.write("Log for {}".format(hostname))
        #file.flush()
        if not directory.is_absolute():
            logging.error(f"BUILD [{str(directory.absolute())}] is not absolute:")
            raise ValueError(f"[{str(directory.absolute())}] is not absolute:")
        subprocess.Popen(BUILD_COMMAND.format(
            hostname=hostname,
            dir=str(directory.absolute())
        ).split(), stdout=file, stderr=file)


if __name__ == '__main__':
    build_template_ros_core("autobot07", Path("/home/i/template-ros-core"), Path("./logs.txt"))