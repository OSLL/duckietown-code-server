from pathlib import Path
import subprocess
import logging

logging.basicConfig(level=logging.INFO)

RUN_COMMAND = "dts devel run --workdir {dir} -M -s -f -H {hostname} --"
COPY_COMMAND = "rsync --rsh=\"sshpass -p quackquack ssh -o StrictHostKeyChecking=no -l duckie\" --archive duckie@{hostname}.local:/code/template-ros-core/ {dir}"
logging.basicConfig(level=logging.INFO)


def run_template_ros_core(hostname: str, directory: Path, log: Path) -> None:
    with open(log.absolute(), 'w') as file:
        # copy directory from bot to local machine
        logging.info(
            f"COPY template dir from hostname [{hostname}]")
        subprocess.Popen(COPY_COMMAND.format(
            hostname=hostname,
            dir=str(directory.absolute())
        ).split(), stdout=file, stderr=file)
        file.write("Log for {}".format(hostname))
        file.flush()
        # run solution
        logging.info(
            f"RUN template for hostname [{hostname}], directory [{directory}]")
        subprocess.Popen(RUN_COMMAND.format(
            dir=str(directory.absolute()),
            hostname=hostname
        ).split(), stdout=file, stderr=file)
    # send_start_command(hostname)


if __name__ == '__main__':
    run_template_ros_core("autobot10", Path("/home/i/template-ros-core"), Path("./logs.txt"))
