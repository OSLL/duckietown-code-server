from pathlib import Path
import logging
import os
import subprocess

logging.basicConfig(level=logging.INFO)


def run_template_ros_core(hostname: str, directory: Path, log: Path) -> None:
    logging.info(f"RUN template for hostname [{hostname}], directory [{directory}]")
    with open(log.absolute(), 'w') as file:
        # copy directory from bot to local machine
        logging.info(
            f"COPY template dir from hostname [{hostname}]")
        dir = str(directory.absolute())
        os.system(f'rm -fr {dir}/*')

        COPY_COMMAND = f'rsync --rsh="sshpass -p quackquack ssh -o StrictHostKeyChecking=no -l duckie" --archive duckie@{hostname}.local:/code/template-ros-core/ {dir}'
        os.system(COPY_COMMAND)
        RUN_COMMAND = f"dts devel run --workdir {dir} -M -s -f -H {hostname} --"
        logging.info(RUN_COMMAND)
        subprocess.Popen(RUN_COMMAND.format(
            hostname=hostname,
            dir=str(directory.absolute())
        ).split(), stdout=file, stderr=file)
        logging.info(RUN_COMMAND)


if __name__ == '__main__':
    run_template_ros_core("autobot10", Path("/src/template-ros-core"), Path("./logs.txt"))
