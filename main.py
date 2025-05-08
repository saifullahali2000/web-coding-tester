import json
import subprocess
import sys


def write_test(html_content, js_code, data):
    
    js = f'<script>{js_code}</script>'

    head_end_index = html_content.find('</body>')

    if head_end_index != -1:
        html_content = html_content[:head_end_index] + '\n' + js + html_content[head_end_index:]



    code =f"""
import {{ JSDOM }} from 'jsdom';
import {{ assert }} from 'chai';
import $j from 'jquery'; 


const dom = new JSDOM(`{html_content}`, {{
    runScripts: "dangerously", resources: "usable"
}});

const $ = $j(dom.window);
{data}
    """

    with open("files/test.js", "w", encoding="utf-8") as f:
        f.write(code)


def run_tests():

    # Run the JavaScript file using node
    result = subprocess.run(['node', 'files/test.js'], capture_output=True, text=True)
    
    # Print the output of the JavaScript execution
    if result.returncode == 0:
        print("Tests passed successfully!")
        # print("Output:\n", result.stdout)
        return True
    else:
        print("Tests failed.")
        # print("Error:\n", result.stderr)
        return False


if __name__ == "__main__":
    with open("input.json", "r", encoding="utf-8") as f:
        data = json.load(f)

        test_result = {}

        for question in data:
            test_result[question["question_id"]] = []
            print(f"{question["question_id"]}")
            code_data = question["default_code_metadata"]
            html_code = ""
            js_code = ""
            for lang in code_data:
                if lang.get("language").lower() == "html":
                    html_code = lang["code_data"]
                elif lang.get("language").lower() == "javascript":
                    js_code = lang["code_data"]

            for testcase in question["test_cases"]:
                print(f"Running test case {testcase['id']}")
                code = testcase["criteria"]
                write_test(html_code, js_code, code)
                if not run_tests():
                    test_result[question["question_id"]].append(testcase["id"])
                
        with open("files/test-result.json", "w", encoding="utf-8") as f:
            json.dump(test_result, f, indent=4)
